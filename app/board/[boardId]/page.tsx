import { Canvas } from "./_components/canvas";
import { Room } from "@/components/room";

// Interface definition where params is a promise that resolves to an object with boardId
interface BoardIdPageProps {
  params: Promise<{
    boardId: string;
  }>;
}

// Use async/await in the component to resolve params
const BoardIdPage = async ({ params }: BoardIdPageProps) => {
  // Await the params since it's a Promise
  const resolvedParams = await params;

  console.log(resolvedParams.boardId);

  return (
    <Room roomId={resolvedParams.boardId}>
      <Canvas boardId={resolvedParams.boardId} />
    </Room>
  );
};

export default BoardIdPage;
