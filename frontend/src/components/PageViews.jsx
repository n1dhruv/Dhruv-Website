'use client';

import { FiEye } from 'react-icons/fi';
import { usePageViews } from '../hooks/usePageViews';

const PageViews = () => {
  const { count, isLoading, error } = usePageViews();

  // Fail silent — a dead counter service must never break the footer.
  if (!isLoading && (error || count == null)) return null;

  return (
    <p
      className="font-mono text-xs text-mist/80 tracking-wide select-none inline-flex items-center gap-1.5"
      aria-live="polite"
      title="total portfolio views"
    >
      <FiEye size={13} className="text-lilac" aria-hidden="true" />
      {isLoading || count == null ? (
        <span className="inline-block w-12 h-3 bg-white/10 rounded animate-pulse align-middle" aria-label="loading views" />
      ) : (
        <span>{count.toLocaleString('en-US')} views</span>
      )}
    </p>
  );
};

export default PageViews;
