import './account.wrapper.css';

const AccountWrapper = ({ Title, Amount, Description }) => {
  return (
    <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">{Title}</h3>
          <p className="account-amount">{Amount}</p>
          <p className="account-amount-description">{Description}</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
  );
};

export default AccountWrapper;