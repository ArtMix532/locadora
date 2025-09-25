import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Label } from "@/components/ui/label"; // <-- faltava isso!

// Definindo props para o componente
interface SelectDemoProps {
  titulo: string;
}

export function SelectDemo({ titulo }: SelectDemoProps) {
  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="fruit" className="px-1">
        {titulo}
      </Label>
      <div className="relative flex gap-2">
        <Select>
          <SelectTrigger id="fruit" className="w-[180px]">
            <SelectValue/>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Modelos</SelectLabel>
              <SelectItem value="kwid">Kwid</SelectItem>
              <SelectItem value="argo">Argo</SelectItem>
              <SelectItem value="hb20">HB20</SelectItem>
              <SelectItem value="corolla">Corolla</SelectItem>
              <SelectItem value="tcross">T-Cross</SelectItem>
              <SelectItem value="hrv">HR-V</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
