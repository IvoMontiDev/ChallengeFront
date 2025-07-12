import './productStyles/pagination.css';

interface Props {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Pagination({ page, totalPages, onPageChange }: Props) {
  return (
    <div className='pagination'>
      {[...Array(totalPages)].map((_, idx) => (
        <button
          key={idx + 1}
          className='logout-btn'
          onClick={() => onPageChange(idx + 1)}
          disabled={page === idx + 1}
        >
          {idx + 1}
        </button>
      ))}
    </div>
  );
}

export default Pagination;