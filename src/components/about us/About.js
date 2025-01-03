import React, { useState } from "react";
import style from "../about us/About.module.css";
import aboutus1 from "../assets/aboutus1.png";
import aboutus2 from "../assets/aboutus2.png";

export default function About() {
  // State to track visibility for each section
  const [visibleSections, setVisibleSections] = useState({});

  // Function to toggle visibility for a section
  const toggleSection = (sectionId) => {
    setVisibleSections((prevState) => ({
      ...prevState,
      [sectionId]: !prevState[sectionId],
    }));
  };

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        {/* Section 1 */}
        <div className={style.parentLeft}>
          <div className={style.contentLeft}>
            <div className={style.head}>1. Outstanding Contributors</div>
            <div className={style.mainContent}>
              Outstanding Contributors: Name (Main area of expertise on Flora
              of India) Sh. J.M. Garg (efloraofindia website) Sh. Saroj Kumar
              Kasaju (Flora Documentation of Nepal) Dr. Gurcharan Singh (Western
              Himalayas) Dr. Pankaj Kumar (Orchidaceae) Sh. Dinesh Valke
              (Compilation of names in Indian languages & Flora Documentation)
              Dr. Nidhan Singh (Western Himalayas) Dr. Manoj Chandran (Poaceae)
              Dr. D. S. Rawat (Western Himalayas)
              {visibleSections[1] && (
                <span>
                  {" "}
                  Additional details about outstanding contributors can go here.
                </span>
              )}
              <div
                className={style.more}
                onClick={() => toggleSection(1)}
                style={{ cursor: "pointer", color: "#000000" }}
              >
                {visibleSections[1] ? "View Less" : "View More"}
              </div>
            </div>
          </div>
          <div className={style.aboutImg}>
            <img src={aboutus1} alt="img"></img>
          </div>
        </div>

        {/* Section 2 */}
        <div className={style.parentRight}>
          <div className={style.aboutImg}>
            <img src={aboutus2} alt="img"></img>
          </div>
          <div className={style.contentRight}>
            <div className={style.head}>2. Subject/Area Experts</div>
            <div className={style.mainContent}>
              Subject/Area Experts: Dr. Manoj Chandran (Poaceae) Dr. M. Sabu
              (Zingiberaceae, Marantaceae & Musaceae) Dr. N.P. Balakishnan
              (Euphorbiaceae) Dr. Chris Fraser-Jenkins (Pteridophytes) Dr. V P
              Prasad (Cyperaceae) Dr. Mayur Nandikar (Commelinaceae)
              {visibleSections[2] && (
                <span>
                  {" "}
                  Additional details about subject/area experts can go here.
                </span>
              )}
              <div
                className={style.more}
                onClick={() => toggleSection(2)}
                style={{ cursor: "pointer", color: "#000000" }}
              >
                {visibleSections[2] ? "View Less" : "View More"}
              </div>
            </div>
          </div>
        </div>

        {/* Section 3 */}
        <div className={style.parentLeft}>
          <div className={style.contentLeft}>
            <div className={style.head}>3. The Pillars</div>
            <div className={style.mainContent}>
              The Pillars: Name (Main area of expertise on Flora of India) Sh.
              J.M. Garg (efloraofindia website) Sh. Saroj Kumar Kasaju (Flora
              Documentation of Nepal) Dr. Gurcharan Singh (Western Himalayas)
              {visibleSections[3] && (
                <span>
                  {" "}
                  Additional details about the pillars can go here.
                </span>
              )}
              <div
                className={style.more}
                onClick={() => toggleSection(3)}
                style={{ cursor: "pointer", color: "#000000" }}
              >
                {visibleSections[3] ? "View Less" : "View More"}
              </div>
            </div>
          </div>
          <div className={style.aboutImg}>
            <img src={aboutus1} alt="img"></img>
          </div>
        </div>

        {/* Section 4 */}
        <div className={style.parentRight}>
          <div className={style.aboutImg}>
            <img src={aboutus2} alt="img"></img>
          </div>
          <div className={style.contentRight}>
            <div className={style.head}>4. Moderators</div>
            <div className={style.mainContent}>
              Moderators: Dr. Nidhan Singh, Sh. J.M. Garg, and other dedicated
              contributors oversee discussions and ensure accuracy.
              {visibleSections[4] && (
                <span>
                  {" "}
                  Additional details about moderators can go here.
                </span>
              )}
              <div
                className={style.more}
                onClick={() => toggleSection(4)}
                style={{ cursor: "pointer", color: "#000000" }}
              >
                {visibleSections[4] ? "View Less" : "View More"}
              </div>
            </div>
          </div>
        </div>

        {/* Section 5 */}
        <div className={style.parentLeft}>
          <div className={style.contentLeft}>
            <div className={style.head}>5. Major Contributors</div>
            <div className={style.mainContent}>
              Major Contributors: Sh. Saroj Kumar Kasaju (Flora Documentation of
              Nepal), Dr. Pankaj Kumar (Orchidaceae), and many others play
              significant roles.
              {visibleSections[5] && (
                <span>
                  {" "}
                  Additional details about major contributors can go here.
                </span>
              )}
              <div
                className={style.more}
                onClick={() => toggleSection(5)}
                style={{ cursor: "pointer", color: "#000000" }}
              >
                {visibleSections[5] ? "View Less" : "View More"}
              </div>
            </div>
          </div>
          <div className={style.aboutImg}>
            <img src={aboutus1} alt="img"></img>
          </div>
        </div>

        {/* Section 6 */}
        <div className={style.parentRight}>
          <div className={style.aboutImg}>
            <img src={aboutus2} alt="img"></img>
          </div>
          <div className={style.contentRight}>
            <div className={style.head}>
              6. Details of Some Important Contributors
            </div>
            <div className={style.mainContent}>
              Learn about key contributors such as Dr. M. Sabu, Dr. Nidhan
              Singh, and others who have provided invaluable contributions.
              {visibleSections[6] && (
                <span>
                  {" "}
                  Additional details about these contributors can go here.
                </span>
              )}
              <div
                className={style.more}
                onClick={() => toggleSection(6)}
                style={{ cursor: "pointer", color: "#000000" }}
              >
                {visibleSections[6] ? "View Less" : "View More"}
              </div>
            </div>
          </div>
        </div>

        {/* Section 7 */}
        <div className={style.parentLeft}>
          <div className={style.contentLeft}>
            <div className={style.head}>7. Top 10 Contributors Over the Years</div>
            <div className={style.mainContent}>
              Recognizing the top 10 contributors for their dedication and
              efforts in the field of flora documentation.
              {visibleSections[7] && (
                <span>
                  {" "}
                  Additional details about the top 10 contributors can go here.
                </span>
              )}
              <div
                className={style.more}
                onClick={() => toggleSection(7)}
                style={{ cursor: "pointer", color: "#000000" }}
              >
                {visibleSections[7] ? "View Less" : "View More"}
              </div>
            </div>
          </div>
          <div className={style.aboutImg}>
            <img src={aboutus1} alt="img"></img>
          </div>
        </div>
      </div>
    </div>
  );
}
