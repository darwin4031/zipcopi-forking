import styles from "./index.module.scss";
import Wave from "./wave.svg";

const TrustedList = [
  {
    src: "/img/logo-hotel-chocolat.png",
    alt: "Hotel Chocolat",
  },
  {
    src: "/img/logo-wh-smith.png",
    alt: "WH Smith",
  },
  {
    src: "/img/logo-zyliss.png",
    alt: "Zyliss",
  },
  {
    src: "/img/logo-ken-hom.png",
    alt: "Ken Hom",
  },
  {
    src: "/img/logo-h-samuel.png",
    alt: "H.Samuel",
  },
];

const Trusted = () => {
  return (
    <>
      <div className={styles.trusted}>
        <div className="container">
          <div className={styles.trusted__title}>Trusted by</div>
          <div className={styles.trusted__subtitle}>2000+ customers trust & love SaaSup</div>
          <div className={styles.trusted__list}>
            {TrustedList.map((item, i) => (
              <div key={i} className={styles.trusted__logo}>
                <img className={styles.trusted__logoImg} {...item} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.wave}>
        <Wave className={styles.wave__svg} />
      </div>
    </>
  );
};

export default Trusted;
