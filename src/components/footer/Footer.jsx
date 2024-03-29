import React from 'react'
import styles from './footer.module.css'

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>Alpaca</div>
      <div className={styles.text}>
        Alpaca creative thoughts agency &copy; All rights reserved
      </div>
    </div>
  )
}

export default Footer