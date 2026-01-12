import { type DefinitionDetailPrpps } from "./DefinitionListTypes";

export function DefinitionDetail({
  children,
  cx,
  ...rest
}: DefinitionDetailPrpps) {
  const definitionDetailProps = {
    ...rest,
    className: cx,
  };
  return (
    <>
      <dd {...definitionDetailProps}>{children}</dd>
    </>
  );
}
