import { useEffect } from 'react';

function useOutsideClickChecker(ref, setState) {
  useEffect(() => {
    const handleClickOutside = e => {
      if (!ref.current?.contains(e.target)) {
        setState(null);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [ref]);
}

export default useOutsideClickChecker;
