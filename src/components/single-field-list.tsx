import { RecordContextProvider, useListContext } from "ra-core";

export const SingleFieldList = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { data } = useListContext();
  return (
    <div className={`flex  gap-2 ${className}`}>
      {data?.map((record, index) => (
        <RecordContextProvider key={index} value={record}>
          {children}
        </RecordContextProvider>
      ))}
    </div>
  );
};
