import { useAlert } from "react-alert";
export function Message({ type, msg }) {
  const alert = useAlert();

  return alert.show(msg, {
    type: type,
  });
}
