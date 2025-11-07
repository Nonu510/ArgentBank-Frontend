import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// 🔹 Connexion utilisateur
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (credentials, thunkAPI) => {
    try {
      const response = await fetch('http://localhost:3001/api/v1/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        return thunkAPI.rejectWithValue(data.message || 'Identifiants incorrects');
      }

      localStorage.setItem('token', data.body.token);
      return data.body; // { token }
    } catch {
      return thunkAPI.rejectWithValue('Erreur serveur');
    }
  }
);

// 🔹 Récupération du profil utilisateur
export const fetchUserProfile = createAsyncThunk(
  'user/fetchUserProfile',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.user.token || localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return thunkAPI.rejectWithValue(data.message || 'Erreur lors du chargement du profil');
      }

      return data.body;
    } catch {
      return thunkAPI.rejectWithValue('Erreur serveur');
    }
  }
);

// 🔹 Mise à jour du profil utilisateur
// ...imports etc (garde le reste du fichier inchangé)

// updateUserProfile thunk : envoie userName (ou conserve userName si déjà présent)
export const updateUserProfile = createAsyncThunk(
  'user/updateUserProfile',
  async (payload, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.user.token || localStorage.getItem('token');

    // payload peut être { userName } ou { firstName, lastName } selon usage
    // normalisons pour envoyer userName au backend (qui n'accepte que userName)
    let userNameToSend = '';
    if (payload.userName) {
      userNameToSend = payload.userName.trim();
    } else if (payload.firstName || payload.lastName) {
      const f = (payload.firstName || '').trim();
      const l = (payload.lastName || '').trim();
      userNameToSend = `${f} ${l}`.trim();
    } else {
      return thunkAPI.rejectWithValue('Aucun nom fourni');
    }

    try {
      const response = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userName: userNameToSend }),
      });

      const data = await response.json();

      if (!response.ok) {
        return thunkAPI.rejectWithValue(data.message || 'Erreur lors de la mise à jour du profil');
      }

      // On renvoie une représentation *locale* cohérente :
      // on merge les valeurs locales et le userName envoyé (le backend ne renvoie pas forcément firstName/lastName).
      return {
        ...state.user.userInfo,
        userName: userNameToSend,
        // si payload contenait firstName/lastName, on les conserve localement aussi
        firstName: payload.firstName ?? state.user.userInfo?.firstName,
        lastName: payload.lastName ?? state.user.userInfo?.lastName,
      };
    } catch (err) {
      console.error('updateUserProfile thunk error:', err);
      return thunkAPI.rejectWithValue('Erreur serveur');
    }
  }
);



// 🔹 Slice Redux
const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: localStorage.getItem('token') || null,
    userInfo: JSON.parse(localStorage.getItem('userInfo')) || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.userInfo = null;
      localStorage.removeItem('token');
      localStorage.removeItem('userInfo');
    },
    updateName: (state, action) => {
      if (!state.userInfo) state.userInfo = {};
      state.userInfo = { ...state.userInfo, ...action.payload };
      try {
        localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
      } catch {
        console.warn('Erreur lors de la sauvegarde du profil');
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // 🟡 LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔵 FETCH PROFILE
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        try {
          localStorage.setItem('userInfo', JSON.stringify(action.payload));
        } catch {
          console.warn('Erreur lors de la sauvegarde du profil');
        }
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🟢 UPDATE PROFILE
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
    // on remplace l'objet userInfo par celui renvoyé/mergé (pas d'objet partiel non intentionnel)
        state.userInfo = {
        ...state.userInfo,
        ...action.payload,
      };
      try {
        localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
      } catch (e) {
        console.warn('localStorage save failed', e);
      }
    }
})

      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, updateName } = userSlice.actions;
export default userSlice.reducer;
