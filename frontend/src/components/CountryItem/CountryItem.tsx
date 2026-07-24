import { useState, useEffect } from 'react';
import styles from './CountryItem.module.css';
import type { CountryItem as CountryItemType } from '@/types/country';
import { getCountryFlagUrl } from '@/utils/flags';
import { fetchWeather } from '@/services/weatherApi';

interface CountryItemProps {
  country: CountryItemType;
  onClick: (countryName: string) => void;
}

export function CountryItem({ country, onClick }: CountryItemProps) {
  const [conditionIcon, setConditionIcon] = useState<string | null>(null);
  const flagUrl = getCountryFlagUrl(country.name);

  useEffect(() => {
    let mounted = true;
    fetchWeather(country.name)
      .then((data) => {
        if (mounted && data.condition_icon) {
          setConditionIcon(data.condition_icon);
        }
      })
      .catch(() => {});
    return () => { mounted = false; };
  }, [country.name]);

  return (
    <div
      className={styles.itemCard}
      onClick={() => onClick(country.name)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick(country.name);
        }
      }}
    >
      <div className={styles.content}>
        <div className={styles.leftContent}>
          {flagUrl ? (
            <img src={flagUrl} alt={`${country.name} flag`} className={styles.flag} />
          ) : (
            <span className={styles.flagFallback}>🏳️</span>
          )}
          <span className={styles.name} title={country.name}>{country.name}</span>
        </div>
        
        <div className={styles.rightContent}>
          {conditionIcon ? (
             <img src={conditionIcon} alt="condition" className={styles.apiWeatherIcon} />
          ) : (
             <div className={styles.iconPlaceholder} />
          )}
        </div>
      </div>
    </div>
  );
}
