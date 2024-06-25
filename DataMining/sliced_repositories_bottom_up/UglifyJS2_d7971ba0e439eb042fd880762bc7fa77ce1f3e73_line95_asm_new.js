asm_mixed: {
    expect: {
        function no_asm_GeometricMean(stdlib, foreign, buffer) {
            function logSum(start, end) {
                start = 0 | start, end = 0 | end;
                var sum = 0, p = 0, q = 0;
                for (p = start << 3, q = end << 3; (0 | p) < (0 | q); p = p + 8 | 0) sum += +log(values[p >> 3]);
            }
        }
    }
}
