// Ćwiczenie z debuggerem (poniedziałek 3).
// Skrypt z poprawionymi pięcioma błędami. Otwórz index.html w przeglądarce,
// włącz DevTools (F12), a następnie kliknij przycisk „Policz wykonane zadania”.

const zadania = [
  { tytul: 'Struktura repozytorium', status: 'done' },
  { tytul: 'Skrypt bazy danych', status: 'done' },
  { tytul: 'API tablic', status: 'in_progress' },
  { tytul: 'Widok tablicy', status: 'todo' },
  { tytul: 'Raport testów', status: 'todo' }
];

function policzWykonane(lista) {
  let licznik = 0;

  // Poprawka: i < lista.length, aby nie odczytywać elementu poza końcem tablicy.
  for (let i = 0; i < lista.length; i++) {
    // Poprawka: === porównuje status, zamiast nadpisywać go operatorem =.
    if (lista[i].status === 'done') {
      licznik++;
    }
  }

  // Poprawka: zwracamy policzoną wartość do funkcji wywołującej.
  return licznik;
}

function pokazPodsumowanie() {
  // Poprawka: używamy prawidłowej nazwy tablicy — zadania.
  const wykonane = policzWykonane(zadania);
  const procent = Math.round((wykonane / zadania.length) * 100);
  document.getElementById('wynik').textContent = `Wykonane: ${wykonane} z ${zadania.length} (${procent}%)`;
}

// Poprawka: prawidłowa nazwa zdarzenia to 'click'.
document.getElementById('policz').addEventListener('click', pokazPodsumowanie);
