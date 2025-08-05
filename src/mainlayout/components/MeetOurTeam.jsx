import React from 'react';
import './MeetOurTeam.css';

const MeetOurTeam = () => {
  const teamMembers = [
    {
      name: "Dr. John Stone",
      title: "Chief Medical Officer",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: '/team1.png'
    },
    {
      name: "Dr. Bella Adesya",
      title: "Head of Operations",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: '/team2.png'
    },
    {
      name: "Dr. Pulloh",
      title: "Technical Director",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: '/team3.png'
    }
  ];

  return (
    <section className="meet-our-team">
      <div className="team-container">
        <h2 className="section-title">
          <span className="title-meet">Meet</span>
          <span className="title-out-team">out team</span>
        </h2>
        <div className="team-cards">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-card" style={{backgroundImage: `url(${member?.image})`}}>
              <div className="card-content">
                <div className="member-info">
                  <h3 className="member-name">{member.name}
                  <p className="member-description">Lorem ipsum dolor</p>

                  </h3>
                  {/* <div className="plus-icon">+</div> */}
                </div>
                {/* <div className="member-silhouette">
                  <div className={`silhouette silhouette-${index + 1}`}></div>
                </div> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeetOurTeam; 