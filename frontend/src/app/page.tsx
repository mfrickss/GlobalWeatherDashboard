'use client';

import { useEffect } from 'react';
import { AtmosphericBackground } from '@/components/AtmosphericBackground';
import { DashboardHeader } from '@/components/DashboardHeader';
import { WeatherCardGrid } from '@/components/WeatherCardGrid';
import { WeatherDetailModal } from '@/components/WeatherDetailModal';
import { useCountries } from '@/hooks/useCountries';
import { useDashboard } from '@/hooks/useDashboard';
import { useWeather } from '@/hooks/useWeather';

export default function Home() {
  const {
    items,
    loading: loadingCountries,
    error: countriesError,
  } = useCountries();
  const {
    weather,
    loading: loadingWeather,
    error: weatherError,
    loadWeather,
    clearWeather,
  } = useWeather();
  const {
    unit,
    search,
    displayedItems,
    selectedCountry,
    refreshKey,
    handleSelect,
    handleClose,
    handleUnitChange,
    handleSearchChange,
    handleRefresh,
  } = useDashboard(items);

  async function onSelectCountry(countryName: string) {
    handleSelect(countryName);
    await loadWeather(countryName);
  }

  function onCloseModal() {
    handleClose();
    clearWeather();
  }

  // Trigger re-fetch when refresh button is clicked
  useEffect(() => {
    if (refreshKey > 0 && selectedCountry) {
      loadWeather(selectedCountry);
    }
  }, [refreshKey, selectedCountry, loadWeather]);

  if (countriesError) {
    return (
      <main className="relative min-h-screen bg-[#0f171a] font-sans text-white flex items-center justify-center p-6">
        <AtmosphericBackground />
        <div className="relative z-10 max-w-md text-center rounded-2xl border border-rose-500/20 bg-[#131d20]/80 p-8 backdrop-blur-md">
          <h2 className="text-xl font-semibold text-rose-400 mb-2">
            Failed to Load Countries
          </h2>
          <p className="text-sm text-white/60">{countriesError}</p>
        </div>
      </main>
    );
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0f171a] font-sans text-white">
      <AtmosphericBackground />

      <div className="relative z-10 mx-auto max-w-[1200px] px-5 py-6 md:px-8 md:py-10">
        <DashboardHeader
          unit={unit}
          search={search}
          refreshing={loadingWeather}
          onUnitChange={handleUnitChange}
          onSearchChange={handleSearchChange}
          onRefresh={handleRefresh}
        />

        {loadingCountries ? (
          <div className="flex flex-col items-center justify-center py-20 text-white/40 gap-4">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#7a9a92] border-t-transparent" />
            <p className="text-sm font-medium">Loading countries...</p>
          </div>
        ) : (
          <WeatherCardGrid
            items={displayedItems}
            unit={unit}
            search={search}
            onSelect={onSelectCountry}
          />
        )}
      </div>

      {selectedCountry && (
        <WeatherDetailModal
          country={selectedCountry}
          weather={weather}
          loading={loadingWeather}
          error={weatherError}
          unit={unit}
          onClose={onCloseModal}
        />
      )}
    </div>
  );
}
