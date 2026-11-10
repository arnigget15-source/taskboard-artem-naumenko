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

  for (let i = 0; i < lista.length; i++) { // Poprawka: < zamiast <=, aby nie wyjść poza zakres tablicy.
    if (lista[i].status === 'done') { // Poprawka: === porównuje status, a = nadpisywałoby jego wartość.
      licznik++;
    }
  }

  return licznik; // Poprawka: zwracamy wynik liczenia.
}

function pokazPodsumowanie() {
  const wykonane = policzWykonane(zadania); // Poprawka: przekazujemy tablicę zadania, a nie pojedynczy element.
  const procent = Math.round((wykonane / zadania.length) * 100);
  document.getElementById('wynik').textContent = `Wykonane: ${wykonane} z ${zadania.length} (${procent}%)`;
}

document.getElementById('policz').addEventListener('click', pokazPodsumowanie); // Poprawka: poprawna nazwa zdarzenia to 'click', nie 'clik'.
