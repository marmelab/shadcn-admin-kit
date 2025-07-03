import { Star } from "lucide-react";
import { useRecordContext } from "ra-core";

interface OwnProps {
  size?: "large" | "small";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  record?: any;
}

export const StarRatingField = (props: OwnProps) => {
  const { size = "large" } = props;
  const record = useRecordContext(props);
  if (!record) return null;

  return (
    <span className="inline-flex items-center">
      <StarArray rating={record.rating} size={size} />
    </span>
  );
};

export const StarArray = ({
  rating,
  size,
}: {
  rating: number;
  size?: "large" | "small";
}) => {
  if (!rating) return null;
  return (
    <>
      {Array(Math.round(rating))
        .fill(true)
        .map((_, i) => (
          <Star
            key={i}
            className="text-yellow-500"
            style={{
              width: size === "large" ? 20 : 15,
              height: size === "large" ? 20 : 15,
            }}
          />
        ))}
    </>
  );
};
