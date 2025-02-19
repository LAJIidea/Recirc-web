import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import { popoverProps } from "../../../interfaces/popover.interface";

export default function PopOver({ content, children }: popoverProps) {
    return (
        <Popover backdrop="blur" showArrow placement="bottom">
            <PopoverTrigger>{children}</PopoverTrigger>
            <PopoverContent className="py-3 flex flex-col items-start">
                {content}
            </PopoverContent>
        </Popover>
    );
}
