import CardList from "../cardList";
import Text from "../text";
import Icon from "../icon";
import { formatCurrency } from "../../utils/helpers";

interface CardPriceProps {
  titlePrecio?: string;
}

export default function CardPrice({ titlePrecio }: CardPriceProps) {
  return (
    <CardList className="bg-primary">
      <div className="flex flex-col items-center justify-center gap-2 w-full">
        <Text as="span" size="xl" fontWeight="extrabold" color="text-white">
          Presupuesto Estimado
        </Text>
        <Text
          as="span"
          className="mt-2"
          size="xl3"
          fontWeight="extrabold"
          color="text-white"
        >
          {formatCurrency(titlePrecio)}
        </Text>
        <div className="flex items-center justify-center gap-2 mt-4 bg-white py-3 px-3 rounded-xl shadow-sm border border-primary/10">
          <Icon name="CircleCheck" className="text-primary" />
          <Text as="span" size="sm" color="text-primary" fontWeight="bold">
            Presupuesto Aprobado
          </Text>
        </div>
      </div>
    </CardList>
  );
}
