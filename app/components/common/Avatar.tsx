import {
  Avatar as SAvatar,
  AvatarFallback,
  AvatarImage
} from "@/components/ui/avatar";

type AvatarDProps = {
  image?: string;
  title: string;
};

export function Avatar({ image, title }: AvatarDProps) {
  return (
    <SAvatar>
      {image && <AvatarImage src={image} alt={title} />}
      <AvatarFallback>{title}</AvatarFallback>
    </SAvatar>
  );
}
