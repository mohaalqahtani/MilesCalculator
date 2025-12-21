import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import banks from '@/assets/cards.json';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuGroup } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function BankCho() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const price = searchParams.get("price") || "";
  const { bankId } = useParams();
  const bank = bankId ? banks[bankId] : null;

  const handleBankChange = (key) => {
    navigate(`/bank/${key}?price=${price}`);
  };

  return (
    <>
      {!bankId && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">اختيار بنك</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>قائمة البنوك</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {Object.entries(banks).map(([key, b]) => (
                <DropdownMenuItem key={key} onClick={() => handleBankChange(key)}>
                  <div className="flex items-center justify-between w-full">
                    {b.name}
                    <img className="w-5" src={b.logo} alt={b.name} />
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      {bankId && bank && (
        <div>
          <h2>{bank.name}</h2>
          {bank.cards.map(card => (
            card.label.includes("الفرسان") ? "s" : 
            <div key={card.label}>
              <h3>{card.label}</h3>
              <h4>{card.ProfitRate}</h4>
              <h4>{price / card.ProfitRate}</h4>
            </div>
          ))}
                  <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">اختيار بنك</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>قائمة البنوك</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {Object.entries(banks).map(([key, b]) => (
                <DropdownMenuItem key={key} onClick={() => handleBankChange(key)}>
                  <div className="flex items-center justify-between w-full">
                    {b.name}
                    <img className="w-5" src={b.logo} alt={b.name} />
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        </div>
      )}
    </>
  );
}
