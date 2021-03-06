import React, { useEffect } from 'react';
import { throttle } from 'lodash';
import cx from 'classnames';
import gridStyles from 'scss/grid.module.scss';
import styles from './Nav.module.scss';
import { Grid, Cell } from 'components/Grid';
import Image from 'components/Layout/Image';
import { Link } from 'gatsby';
import { ContactButton } from 'components/Buttons';
import { gatingData } from 'store/gating';

import nLogo from 'assets/images/n-logo.png';

const Nav = ({
  showNavbar = (x) => undefined,
  isDark = false,
  isActive = false,
  isHidden = false,
  isSticky = false,
  revealAfterSplash = false,
  setShouldShowEmailCta,
  shouldShowEmailCta = false,
}) => {
  const handleScroll = throttle(() => {
    if (!revealAfterSplash) {
      showNavbar(window.scrollY >= 300);
      return;
    }

    const mobileOffset = window.innerHeight > window.innerWidth ? 90 : 0;
    showNavbar(window.scrollY >= window.innerHeight + mobileOffset);
  }, 33);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  const shouldShowBlogLink =
    gatingData.shouldShowBlog || process.env.NODE_ENV === 'development';

  return (
    <nav
      className={cx(styles.nav, gridStyles.hidePrint, {
        [styles.active]: isActive,
        [styles.dark]: isDark,
        [styles.hidden]: isHidden,
        [styles.sticky]: isSticky,
      })}
    >
      <div className={styles.body}>
        <Grid columns={12}>
          <Cell width={12}>
            <div className={styles.navLinks}>
              <div className={cx(styles.navItem, styles.navLogoLink)}>
                <Link to='/'>
                  <Image src={nLogo} alt='Adam J Peña Logo' />
                </Link>
              </div>
              {shouldShowBlogLink && (
                <Link className={styles.navLink} to='/blog/'>
                  Blog
                </Link>
              )}
              <Link className={styles.navLink} to='/resume/'>
                Resume
              </Link>
              <div
                className={cx(styles.navItem, styles.navItemEnd, {
                  [styles.navItemEndHiddenXs]: shouldShowBlogLink,
                })}
              >
                <ContactButton
                  {...{ setShouldShowEmailCta, shouldShowEmailCta }}
                >
                  Contact
                </ContactButton>
              </div>
            </div>
          </Cell>
        </Grid>
      </div>
    </nav>
  );
};

export default Nav;
