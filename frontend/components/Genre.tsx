import Link from 'next/link';

export interface GenreProps {
  genre: string;
}

const Genre: React.FC<GenreProps> = ({ genre }) => {
  return (
    <Link href={`/genre/${genre}`} passHref>
      <a className="rounded-full bg-gray-200 px-3 py-1 text-sm font-medium text-gray-800 hover:bg-gray-300">
        {genre}
      </a>
    </Link>
  );
};

export default Genre;
