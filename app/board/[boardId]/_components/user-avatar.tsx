import {Hint} from "@/components/hint";
import { Avatar, AvatarFallback, AvatarImage} from "@radix-ui/react-avatar";

interface UserAvatarProps {
    src?: string;
    name?: string;
    fallback?: string;
    borderColor?: string;
};

export const UserAvatar = ({
    src,
    name,
    fallback,
    borderColor
}: UserAvatarProps) => {
    return (
        <Hint label={name || "Teammate"} side="bottom" sideOffset={18}>
            <Avatar className="h-8 w-8 border-2 rounded-full"
              style={{ borderColor }}
              >
                <AvatarImage src={src} className="rounded-full"/>
                <AvatarFallback className="text-xs font-semibold">
                    {fallback}
                </AvatarFallback>
            </Avatar>
        </Hint>
    );
};