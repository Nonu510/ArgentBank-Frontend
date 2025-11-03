import './account.css'
import AccountSection from '../../components/account.section/account.section';

function Account() {
    

return (
<main class="main bg-dark">
      <div class="header">
        <h1>Welcome back<br />Tony Jarvis!</h1>
        <button class="edit-button">Edit Name</button>
      </div>
      <AccountSection />
    </main>
    )
}

export default Account