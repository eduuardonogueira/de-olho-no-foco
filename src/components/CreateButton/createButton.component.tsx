import styles from './createButton.module.scss'
import { Plus } from "@phosphor-icons/react"

export const createButton = () => {



  return (
    <button className={styles.createButton}>
      <Plus size={32} weight="bold" />
    </button>
  )
}