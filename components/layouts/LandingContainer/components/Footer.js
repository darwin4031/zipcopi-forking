import GeneralLink from "~components/elements/GeneralLink";
import LinkedButton, { LinkedButtonIcon } from "~components/elements/LinkedButton";
import IconFacebook from "~components/svg/icon-facebook-square.svg";
import IconTwitter from "~components/svg/icon-twitter.svg";
import Logo from "~components/svg/logo.svg";
import styles from "./Footer.module.scss";

const Nav = ({ title, list }) => {
  return (
    <div className={styles.nav}>
      <div className={styles.nav__title}>{title}</div>
      <div className={styles.nav__list}>
        {list && list.length
          ? list.map((item, i) => (
              <div key={i} className={styles.nav__item}>
                <GeneralLink className={styles.nav__itemLink} href={item.href}>
                  {item.label}
                </GeneralLink>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

const Top = () => {
  return (
    <div className={styles.top}>
      <div className={styles.top__flex}>
        <div className={styles.top__col}>
          <div className={styles.top__socials}>
            <LinkedButton className={styles.top__socialBtn} href="#">
              <LinkedButtonIcon className={styles.top__socialBtnIcon} svg={IconFacebook} />
            </LinkedButton>
            <LinkedButton className={styles.top__socialBtn} href="#">
              <LinkedButtonIcon className={styles.top__socialBtnIcon} svg={IconTwitter} />
            </LinkedButton>
          </div>
          <div className={styles.top__address}>
            <div className={styles.top__addressName}>Zipcopi</div>
            <div className={styles.top__addressLocation}>
              First Floor, 77 Stokes Croft Bristol, BS1 3RD
            </div>
          </div>
          <div className={styles.top__contact}>
            <div className={styles.top__contactNumber}>+0800 000 0000</div>
            <div className={styles.top__contactEmail}>hello@zipcopi.co.uk</div>
          </div>
        </div>
        <div className={styles.top__col}>
          <div className={styles.top__navsFlex}>
            <Nav
              title="Sub one"
              list={[
                { label: "About us", href: "#" },
                { label: "News & Events", href: "#" },
                { label: "Careers", href: "#" },
                { label: "Contact Us", href: "#" },
                { label: "Support", href: "#" },
              ]}
            />
            <Nav
              title="Sub Two"
              list={[
                { label: "About us", href: "#" },
                { label: "News & Events", href: "#" },
                { label: "Careers", href: "#" },
                { label: "Contact Us", href: "#" },
                { label: "Support", href: "#" },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const Bottom = () => {
  return (
    <div className={styles.bottom}>
      <div className={styles.bottom__flex}>
        <Logo className={styles.bottom__logo} />
        <div className={styles.bottom__right}>© Zipcopi Ltd. {new Date().getFullYear()}</div>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className="container">
        <Top />
        <Bottom />
      </div>
    </div>
  );
};

export default Footer;
