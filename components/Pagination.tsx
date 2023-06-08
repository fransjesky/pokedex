import {
  Pagination as PaginationComponent,
  PaginationProps as MaterialPaginationProps,
} from '@mui/material';
import { ComponentPropsWithoutRef } from 'react';

type PaginationProps = ComponentPropsWithoutRef<typeof PaginationComponent> & {
  count: number;
  page: number;
  onChange: (newPage: number) => void;
};

function Pagination({ count, page, onChange, ...props }: PaginationProps) {
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    onChange(newPage);
  };

  return (
    <PaginationComponent
      count={count}
      page={page}
      onChange={handlePageChange}
      {...props}
    />
  );
}

export default Pagination;
