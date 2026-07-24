import type { CountryItem as CountryItemType } from '@/types/country';
import { CountryItem } from '../CountryItem/CountryItem';
import styles from './CountryList.module.css';

interface CountryListProps {
  items: CountryItemType[];
  onSelect: (countryName: string) => void;
}

export function CountryList({ items, onSelect }: CountryListProps) {
  if (items.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>No countries found matching your search.</p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {items.map((item) => (
        <CountryItem key={item.id} country={item} onClick={onSelect} />
      ))}
    </div>
  );
}
