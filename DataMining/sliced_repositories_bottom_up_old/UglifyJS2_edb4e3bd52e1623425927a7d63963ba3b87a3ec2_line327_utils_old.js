function first_in_statement(stack) {
    var node = stack.parent(-1);
    for (var i = 0, p; p = stack.parent(i); i++) {
        if ((p instanceof AST_Sequence      && p.expressions[0] === node) ||
            (p instanceof AST_Call          && p.expression === node && !(p instanceof AST_New) ) ||
            (p instanceof AST_Dot           && p.expression === node ) ||
            (p instanceof AST_Sub           && p.expression === node ) ||
            (p instanceof AST_Conditional   && p.condition === node  ) ||
            (p instanceof AST_Binary        && p.left === node       ) ||
            (p instanceof AST_UnaryPostfix  && p.expression === node ))
        {
            node = p;
        } else {
    }
}
