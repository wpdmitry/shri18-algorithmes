Первый саджест сделал по принципу: отсортировать список улиц по алфавиту (можно сделать заранее), а
затем с помощью бинарного поиска что-то поискать.

Сложность:
    suggest - O(n1) + O(n1 * log(n2)) = O(n1 * log(n2), где n1 - длина input, n2 - список улиц.

Доп.память:
    ¯\_(ツ)_/¯

Второй саджест мудренно получился и не очень хорошо работает, но хотелось попробовать реализовать.
Идея основа на "кластеризации". Выделим из нашего списка с улицами некоторые кластеры, схожесть к которым в дальнейшем
сможем искать. При поступлении новой улицы будем относить ее к опредленному кластеру, затем в найденном кластере
найдем 10 улиц более "близких" к новой. Алгоритм: для каждой строки с улицей сформируем 33-мерный вектор. В итоге
получится N таких векторов, где N - количество улиц в списке. Далее выделим из этих N векторов "схожие" между собой, а
затем при поступлении новой строки с улицей, преобразуем ее к 33-мерному вектору и найдем из N предыдущих векторов 10
более "похожих" на новый.

Сложность:
    suggest - O('очень сложно')