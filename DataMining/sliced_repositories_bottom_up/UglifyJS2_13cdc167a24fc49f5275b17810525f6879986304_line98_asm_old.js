asm_mixed: {
    options = {
    }
    expect: {
        function no_asm_GeometricMean(stdlib, foreign, buffer) {
            function logSum(start, end) {
                start |= 0, end |= 0;
                for (var sum = 0, p = 0, q = 0, p = start << 3, q = end << 3; (0 | p) < (0 | q); p = p + 8 | 0) sum += +log(values[p >> 3]);
            }
            function geometricMean(start, end) {
                return start |= 0, end |= 0, +exp(logSum(start, end) / (end - start | 0));
            }
        }
    }
}
