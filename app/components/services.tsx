import data from "@/data.json";
import GridItemsContainer, {
  GridItems,
  GridItemsMoreButton,
  GridItemsTitle,
} from "@/app/components/grid-items";

export default function Services() {
  const { gaEventName, label, link } = data.cta;

  return (
    <>
      <GridItemsContainer id="services">
        <GridItemsTitle
          title="Services"
          description="We offer expert technology solutions to help businesses scale,
           enhance efficiency, optimize operations, and drive continuous
           innovation."
        />
        <GridItems
          items={data.services}
          columns={{ base: 1, sm: 2, lg: 4 }}
          classNameCard="rounded"
        />
        <GridItemsMoreButton
          text={label}
          href={link}
          gaEvent={{
            event: gaEventName,
            category: "engagement",
            label: "Service CTA",
          }}
        />
      </GridItemsContainer>
    </>
  );
}
