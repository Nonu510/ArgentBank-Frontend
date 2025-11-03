import './account.section.css';
import AccountWrapper from '../account.wrapper/account.wrapper';
import Account from '../../pages/account/account';

const AccountSection = () => {
  const accountData = [
    {
      Title: "Argent Bank Checking (x8349)",
      Amount: "$2,082.79",
      Description: "Available Balance"
    },
    {     
      Title: "Argent Bank Savings (x6712)",
      Amount: "$10,928.42",
      Description: "Available Balance"
    },
    {
      Title: "Argent Bank Credit Card (x8349)",
      Amount: "$184.30",
      Description: "Current Balance"
    }
  ];

  return (
    <section className="panel">
      <h2 className="sr-only">Accounts</h2>
      {accountData.map((account, index) => (
        <AccountWrapper
          key={index}
          Title={account.Title}
          Amount={account.Amount}  
          Description={account.Description}
        />
      ))}
    </section>
  );
};

export default AccountSection;