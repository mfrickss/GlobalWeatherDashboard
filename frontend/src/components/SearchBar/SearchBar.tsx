import { useState, useEffect, useRef } from 'react';
import styles from './SearchBar.module.css';
import type { CountryItem } from '@/types/country';
import { getCountryFlagUrl } from '@/utils/flags';

interface SearchBarProps {
  items: CountryItem[];
  onSelect: (countryName: string) => void;
  onSearchChange?: (value: string) => void;
}

export function SearchBar({ items, onSelect, onSearchChange }: SearchBarProps) {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filtered = items.filter((item) =>
    item.name.toLowerCase().includes(value.toLowerCase()),
  );

  const showDropdown = isFocused && value.trim().length > 0;

  useEffect(() => {
    if (onSearchChange) {
      onSearchChange(value);
    }
  }, [value, onSearchChange]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={styles.searchContainer} ref={dropdownRef}>
      <input
        type="text"
        className={`${styles.searchInput} ${showDropdown ? styles.dropdownActive : ''}`}
        placeholder="Search for a country..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setIsFocused(true)}
      />
      <div className={styles.searchIcon}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </div>

      {showDropdown && (
        <div className={styles.dropdown}>
          {filtered.length > 0 ? (
            filtered.map((item) => {
              const flagUrl = getCountryFlagUrl(item.name);
              return (
                <div
                  key={item.id}
                  className={styles.dropdownItem}
                  onClick={() => {
                    setValue(item.name);
                    setIsFocused(false);
                    onSelect(item.name);
                  }}
                  role="button"
                  tabIndex={0}
                >
                  <div className={styles.itemContent}>
                    {flagUrl ? (
                      <img
                        src={flagUrl}
                        alt={`${item.name} flag`}
                        className={styles.flagIcon}
                      />
                    ) : (
                      <span className={styles.flagFallback}>🏳️</span>
                    )}
                    <span className={styles.countryName}>{item.name}</span>
                  </div>
                  <svg
                    className={styles.arrow}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </div>
              );
            })
          ) : (
            <div className={styles.emptyState}>
              No countries found matching "{value}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}
