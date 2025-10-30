import React from 'react';
import FeatureItem from '../feature-item/feature-item';
import './features.scss';
import chatIcon from '../../assets/icon-chat.png';
import moneyIcon from '../../assets/icon-money.png';
import securityIcon from '../../assets/icon-security.png';

const Features = () => {
  const featureData = [
    {
      iconSrc: chatIcon,
      iconAlt: "Chat Icon",
      title: "You are our #1 priority",
      description: "Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes."
    },
    {
      iconSrc: moneyIcon,
      iconAlt: "Money Icon",
      title: "More savings means higher rates",
      description: "The more you save with us, the higher your interest rate will be!"
    },
    {
      iconSrc: securityIcon,
      iconAlt: "Security Icon",
      title: "Security you can trust",
      description: "We use top of the line encryption to make sure your data and money is always safe."
    }
  ];

  return (
    <section className="features">
      <h2 className="sr-only">Features</h2>
      {featureData.map((feature, index) => (
        <FeatureItem
          key={index}
          iconSrc={feature.iconSrc}
          iconAlt={feature.iconAlt}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </section>
  );
};

export default Features;
