import { useNavigate } from "react-router";
import { User } from "lucide-react";

import { useAuthContext } from "@/context/useAuthContext";
import { getFirstName } from "@/utils/getFirstName";
import {
  DropdownMenuSeparator,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";

export default function ProfileMenuDropdown() {
  const { session } = useAuthContext();
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <User className="h-5 w-5 cursor-pointer hover:opacity-50" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="start">
        <div>
          <DropdownMenuLabel className="font-semibold">
            {getFirstName(session?.user?.user_metadata?.full_name) ||
              "Minha Conta"}
            <p className="text-xs opacity-70">{session?.user?.email}</p>
          </DropdownMenuLabel>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => navigate("/profile")}>
            Minha Conta
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate("/plan")}>
            Plano
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => navigate("/logout")}
            className="text-red-500 font-semibold"
          >
            Sair
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
