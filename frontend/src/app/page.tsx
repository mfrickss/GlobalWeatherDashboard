'use client';

import { useState, useMemo } from 'react';
import { useCountries } from '@/hooks/useCountries';
import { useWeather } from '@/hooks/useWeather';
import { SearchBar } from '@/components/SearchBar/SearchBar';
import { CountryList } from '@/components/CountryList/CountryList';
import { WeatherModal } from '@/components/WeatherModal/WeatherModal';
import styles from './page.module.css';

export default function Home() {
  const { items, loading: loadingCountries, error: countriesError } = useCountries();
  const {
    weather,
    loading: loadingWeather,
    error: weatherError,
    loadWeather,
    clearWeather,
  } = useWeather();
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(
    () => items.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase())),
    [items, searchQuery]
  );

  async function handleSelect(country: string) {
    setSelectedCountry(country);
    await loadWeather(country);
  }

  function handleCloseModal() {
    setSelectedCountry(null);
    clearWeather();
  }

  if (countriesError) {
    return (
      <main className={styles.main}>
        <div className={styles.errorContainer}>
          <h2>Failed to Load Countries</h2>
          <p>{countriesError}</p>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <div className={styles.heroGlow}></div>

      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Global Weather</h1>
          <p className={styles.subtitle}>
            Select a country to view real-time weather
          </p>
        </header>

        {loadingCountries ? (
          <div className={styles.loadingState}>
            <div className={styles.pulse}></div>
            <p>Loading countries...</p>
          </div>
        ) : (
          <SearchBar 
            items={items} 
            onSelect={handleSelect} 
            onSearchChange={setSearchQuery} 
          />
        )}
        
        {/* Restoring the normal display of countries with the new small cards */}
        {!loadingCountries && items.length > 0 && (
          <CountryList items={filteredItems} onSelect={handleSelect} />
        )}

        {selectedCountry && (
          <WeatherModal
            country={selectedCountry}
            weather={weather}
            loading={loadingWeather}
            error={weatherError}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </main>
  );
}
