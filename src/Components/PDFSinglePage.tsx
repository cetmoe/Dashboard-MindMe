import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import '../styles/pdf.css';

interface strOrBuf {
  base64string: string | null;
  children?: React.ReactNode;
}

const PDFSinglePage = ({ base64string }: strOrBuf) => {
  if (!base64string) return <></>;

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber(
      (prevPageNumber) => prevPageNumber + offset
    );
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  return (
    <>
      <Document
        file={`data:application/pdf;base64,${base64string}`}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={console.error}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <div>
        <p>
          Page {pageNumber || (numPages ? 1 : '--')} of{' '}
          {numPages || '--'}
        </p>
        <button
          type='button'
          disabled={pageNumber <= 1}
          onClick={previousPage}
        >
          Previous
        </button>
        <button
          type='button'
          disabled={pageNumber >= numPages}
          onClick={nextPage}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default PDFSinglePage;
