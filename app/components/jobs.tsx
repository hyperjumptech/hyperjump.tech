import { jobs } from "@/data.json";
import GridItemsContainer, {
  GridItems,
  GridItemsTitle,
} from "@/app/components/grid-items";

export default function Jobs() {
  return (
    <GridItemsContainer>
      <GridItemsTitle title="Available Positions" />
      <GridItems items={jobs} />
    </GridItemsContainer>
  );
}
