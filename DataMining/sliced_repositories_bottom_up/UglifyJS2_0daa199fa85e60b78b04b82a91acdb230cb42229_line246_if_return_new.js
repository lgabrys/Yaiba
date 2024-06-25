if_return_1: {
    options = {
    }
}
if_return_2: {
    options = {
    }
}
if_return_3: {
    options = {
    }
}
if_return_4: {
    options = {
    }
}
if_return_5: {
    options = {
    }
}
if_return_6: {
    options = {
    }
}
if_return_7: {
    options = {
    }
}
if_return_8: {
    options = {
    }
}
issue_1089: {
    options = {
    }
    expect: {
        function x() {
            var f = document.getElementById("fname");
            if (12345 < f.files[0].size)
                return alert("alert"), f.focus(), !1;
        }
    }
}
