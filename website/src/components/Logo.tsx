import {Code} from "lucide-react"

// @ts-expect-error just forwarding props
export function Logo(props) {
  return (
    <Code {...props} />
  );
}
