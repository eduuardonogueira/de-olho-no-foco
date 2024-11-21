import styles from "./cancelRoute.module.scss";
import { RoutingContext } from "@contexts/RoutingContext";
import { XCircle } from "@phosphor-icons/react";
import { useContext, useEffect, useState } from "react";

export const CancelRoute = () => {
  const { end, setEnd, routingMachine } = useContext(RoutingContext);

  const [isOpen, setIsOpen] = useState(false);

  function handleCancelRoute() {
    setEnd(null);
    routingMachine?.remove();
    setIsOpen(false);
  }

  useEffect(() => {
    if (end !== null) {
      setIsOpen(true);
    }

  }, [end]);

  if (isOpen)
    return (
      <button className={styles.button} onClick={handleCancelRoute}>
        <XCircle size={26} />
      </button>
    );
};
