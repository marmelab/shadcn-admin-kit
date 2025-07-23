import ShikiHighlighter from "react-shiki";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import HeroScreenshot from "/img/reviews-screenshot.png";

const HOTSPOTS = {
  menu: {
    description: `import { Resource } from "ra-core";
import { Admin } from "@/components/admin";

export const App = () => {
  return (
    <Admin
      dataProvider={dataProvider}
      dashboard={Dashboard}
    >
      <Resource {...orders} />
      <Resource {...products} />
      <Resource {...categories} />
      <Resource {...customers} />
      <Resource {...reviews} />
    </Admin>
  );
}`,
    width: 240,
    height: 555,
    x: 8,
    y: 8,
    side: "right" as const,
  },
  filters: {
    description: `import {
  AutocompleteInput,
  ReferenceInput,
  TextInput,
} from "@/components/admin";

const filters = [
  <TextInput source="q" placeholder="Search" label={false} />,
  <ReferenceInput
    source="customer_id"
    reference="customers"
  >
    <AutocompleteInput placeholder="Filter by customer" label={false} />
  </ReferenceInput>,
];`,
    width: 416,
    height: 40,
    x: 270,
    y: 98,
    side: "bottom" as const,
  },
  bulkActions: {
    description: `import { BulkActionsToolbar, List } from "@/components/admin";
import { BulkApproveButton } from "./BulkApproveButton";
import { BulkRejectButton } from "./BulkRejectButton";

export const ReviewList = () => {
  return (
    <List
      bulkActionsToolbar={
        <BulkActionsToolbar>
          <BulkApproveButton />
          <BulkRejectButton />
        </BulkActionsToolbar>
      }
    >
      {/* ... */}
    </List>
  );
};`,
    width: 401,
    height: 52,
    x: 308,
    y: 478,
    side: "top" as const,
  },
  customerField: {
    description: `import { useRecordContext } from "ra-core";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { TextField } from "@/components/admin";

export const CustomerField = () => {
  const record = useRecordContext();
  return (
    <div className="flex items-center gap-1">
      {record ? (
        <Avatar className="w-6 h-6 mr-1">
          <AvatarImage src={record.avatar} />
          <AvatarFallback>
            {record.first_name?.charAt(0)}
            {record.last_name?.charAt(0)}
          </AvatarFallback>
        </Avatar>
      ) : (
        <Avatar />
      )}
      <TextField source="first_name" />
      <TextField source="last_name" />
    </div>
  );
};`,
    width: 180,
    height: 50,
    x: 760,
    y: 56,
    side: "left" as const,
  },
  productField: {
    description: `import { ReferenceField } from "@/components/admin";

export const ProductField = () => (
  <ReferenceField source="product_id" reference="products" />
);`,
    width: 180,
    height: 50,
    x: 952,
    y: 56,
    side: "left" as const,
  },
  starRatingField: {
    description: `import { Star } from "lucide-react";
import { useRecordContext } from "ra-core";

export const StarRatingField = () => {
  const record = useRecordContext();
  if (!record) return null;
  return (
    <span className="inline-flex items-center">
      <StarArray rating={record.rating} />
    </span>
  );
};

const StarArray = ({ rating }: { rating: number }) => {
  if (!rating) return null;
  return Array(Math.round(rating))
    .fill(true)
    .map((_, i) => <Star key={i} className="text-yellow-500" />);
};`,
    width: 180,
    height: 50,
    x: 952,
    y: 110,
    side: "left" as const,
  },
  statusInput: {
    description: `import { AutocompleteInput } from "@/components/admin";

export const StatusInput = () => (
  <AutocompleteInput
    source="status"
    choices={[
      { id: "accepted", name: "Approved" },
      { id: "rejected", name: "Rejected" },
      { id: "pending", name: "Pending" },
    ]}
  />
);`,
    width: 384,
    height: 67,
    x: 760,
    y: 170,
    side: "left" as const,
  },
  commentInput: {
    description: `import { TextInput } from "@/components/admin";

export const CommentInput = () => (
  <TextInput source="comment" multiline rows={5} />
);`,
    width: 384,
    height: 112,
    x: 760,
    y: 242,
    side: "left" as const,
  },
};

const IMG_WIDTH = 1152;
const IMG_HEIGHT = 571;
const HOTSPOT_RADIUS = 12;

const HotspotSvg = () => {
  return (
    <div className="relative">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${IMG_WIDTH} ${IMG_HEIGHT}`}
        width={IMG_WIDTH}
        height={IMG_HEIGHT}
        className="mx-auto rounded-2xl shadow-lg ring-1 ring-gray-900/10"
      >
        <image
          href={HeroScreenshot}
          x="0"
          y="0"
          width={IMG_WIDTH}
          height={IMG_HEIGHT}
        />
        <foreignObject
          x="0"
          y="0"
          width={IMG_WIDTH}
          height={IMG_HEIGHT}
          className="relative group/all pointer-events-none"
          opacity="1"
        >
          <div className="absolute left-0 top-0 pointer-events-none opacity-0 duration-150 ease-in-out transition-opacity group-hover/all:opacity-100 group-hover/all:z-[3] bg-gray-0 bg-opacity-20 backdrop-blur-sm w-full h-full" />
          <svg height="0" width="0">
            <defs>
              {Object.entries(HOTSPOTS).map(([key, hotspot]) => (
                <clipPath id={`clip-${key}`} key={key}>
                  <rect
                    x={hotspot.x}
                    y={hotspot.y}
                    width={hotspot.width}
                    height={hotspot.height}
                    rx={HOTSPOT_RADIUS}
                    ry={HOTSPOT_RADIUS}
                  />
                </clipPath>
              ))}
            </defs>
          </svg>
          {Object.entries(HOTSPOTS).map(([key, hotspot]) => (
            <Tooltip key={key}>
              <TooltipTrigger asChild>
                <div
                  className="absolute group/highlight pointer-events-none hover:z-[5]"
                  style={{
                    left: hotspot.x,
                    top: hotspot.y,
                    width: hotspot.width,
                    height: hotspot.height,
                  }}
                >
                  <div className="z-[2] group-hover/highlight:drop-shadow-xl/25 pointer-events-auto transition-[filter] ease-in-out duration-200">
                    <div
                      style={{
                        position: "absolute",
                        width: IMG_WIDTH,
                        height: IMG_HEIGHT,
                        left: -hotspot.x,
                        top: -hotspot.y,
                        backgroundImage: `url(${HeroScreenshot})`,
                        clipPath: `url(#clip-${key})`,
                      }}
                    />
                  </div>
                  <div
                    className="z-[2] duration-200 ease-in-out transition-opacity opacity-100 group-hover/all:opacity-0 group-hover/highlight:opacity-0"
                    style={{
                      position: "absolute",
                      left: -3,
                      top: -3,
                    }}
                  >
                    <span className="relative flex size-4">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
                      <span className="relative inline-flex size-4 rounded-full bg-sky-500"></span>
                    </span>
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent side={hotspot.side} className="p-0">
                <ShikiHighlighter
                  language="tsx"
                  theme="github-dark-high-contrast"
                  showLanguage={false}
                >
                  {hotspot.description}
                </ShikiHighlighter>
              </TooltipContent>
            </Tooltip>
          ))}
        </foreignObject>
      </svg>
    </div>
  );
};

export default HotspotSvg;
