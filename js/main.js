$(document).ready(function () {
    selectState();
    addTodoItem();
    checkboxAllAction();
    destroyTodoItem();
    selectToDoItem();
    editTodoItem();
    deleteToDoListCompleted();
    isShowFooter();
    isShowClearCompleted();
    isShowLabelCheckboxAll();
});

//toggle lable checkbox all
function isShowLabelCheckboxAll(){
    if($(".view").length) {
        $('.toggle-wrap').show();
    }else{
        $('.toggle-wrap').hide();
    }
}

// toggle button clear completed
function isShowClearCompleted(){
    if($(".view:has(.completed)").length) {
        $(".clear-completed").show();
    }else{
        $(".clear-completed").hide();
    }
}

//toggle footer
function isShowFooter(){
    if($(".view").length) {
        $('.footer').show();
    }else{
        $('.footer').hide();
    }
}

//update to do list in active state
function updateTotalTodoListActive(){
    $('.total-todo-active').text($('.view:has(.active)').length);
}

// delete to do list completed
function deleteToDoListCompleted() {
    $(".clear-completed").click(function () {
        $(".view:has(.completed)").remove();
        isShowFooter();
        isShowLabelCheckboxAll();
    })
}

// acticion when click to checkbox all
function checkboxAllAction() {
    $(".toggle-all").click(function () {
        if($(".all.active").length){
            if ($('.toggle-all').is(':checked')) {
                $(".toggle").each(function () {
                    this.checked = true;
                    $(this).next().css('text-decoration', 'line-through');
                    $(this).next().addClass('completed');
                    $(this).next().removeClass('active');
                    $('.total-todo-active').text('0');
                });
            } else {
                $(".toggle").each(function () {
                    this.checked = false;
                    $(this).next().css('text-decoration', 'unset');
                    $(this).next().removeClass('completed');
                    $(this).next().addClass('active');
                    updateTotalTodoListActive();
                });
            }
        }

        if($(".to-do-active.active").length){
            if ($('.toggle-all').is(':checked')) {
                $(".view:has(.active)").each(function () {
                    $(this).find(".toggle").prop('checked', true);
                    $(this).find(".edit").css('text-decoration', 'line-through');
                    $(this).find(".edit").addClass('completed');
                    $(this).find(".edit").removeClass('active');
                    $('.total-todo-active').text('0');
                    $(".view:has(.completed)").hide();
                });
            }else{
                $(".view:has(.completed)").each(function () {
                    $(this).find(".toggle").prop('checked', false);
                    $(this).find(".edit").css('text-decoration', 'unset');
                    $(this).find(".edit").removeClass('completed');
                    $(this).find(".edit").addClass('active');
                    updateTotalTodoListActive();
                    $(".view:has(.active)").show();
                })
            }
        }

        if($(".to-do-completed.active").length){
            if ($('.toggle-all').is(':checked')) {
                $(".view:has(.active)").each(function () {
                    $(this).find(".toggle").prop('checked', true);
                    $(this).find(".edit").css('text-decoration', 'line-through');
                    $(this).find(".edit").addClass('completed');
                    $(this).find(".edit").removeClass('active');
                    $('.total-todo-active').text('0');
                    $(".view").show();
                });
            }else{
                $(".view:has(.completed)").each(function () {
                    $(this).find(".toggle").prop('checked', false);
                    $(this).find(".edit").css('text-decoration', 'unset');
                    $(this).find(".edit").removeClass('completed');
                    $(this).find(".edit").addClass('active');
                    updateTotalTodoListActive();
                    $(".view").hide();
                })
            }
        }
        isShowClearCompleted();
    });
}

// add new to do list
function addTodoItem() {
    $(".new-todo").keypress(function (e) {
        if (e.which == 13 && $(this).val().length > 0) {
            $('.todo-list').append(`<li class="view">
                        <input class="toggle" type="checkbox">
                        <input class="edit active" value="${$(this).val()}" disabled>
                        <button class="destroy">X</button>
                    </li>`);
            updateTotalTodoListActive();
            $(this).val('');
            isShowFooter();
            isShowLabelCheckboxAll();
            if($(".to-do-completed.active").length){
                $(".view:has(.active)").hide();
            }
        }
    });
}

// destroy to do list
function destroyTodoItem() {
    $(document).on('click', '.destroy', function () {
        $(this).parent().remove();
        $('.total-todo-active').text($('.view').length);
        updateTotalTodoListActive();
        isShowFooter();
        isShowClearCompleted()
    })
}

// when click checkbox to do list item
function selectToDoItem() {
    $(document).on('click', '.toggle', function () {
        if($(".all.active").length) {
            if ($(this).is(':checked')) {
                $(this).next().css('text-decoration', 'line-through');
                $(this).next().addClass('completed');
                $(this).next().removeClass('active');
            } else {
                $(this).next().removeClass('completed');
                $(this).next().addClass('active');
                $(this).next().css('text-decoration', 'unset');
            }
        }
        if($(".to-do-active.active").length){
            $(this).next().addClass('completed');
            $(this).next().removeClass('active');
            $(this).parent().hide();
        }

        if($(".to-do-completed.active").length) {
            $(this).next().addClass('active');
            $(this).next().removeClass('completed');
            $(this).next().css('text-decoration', 'unset');
            if($(".view:has(.completed)").length === $(".view").length){
                $(".toggle-all").prop('checked', true);
            }else{
                $(".toggle-all").prop('checked', false);
            }
            $(this).parent().hide();
        }
        updateTotalTodoListActive();
        isShowClearCompleted();
    })
}

// edit to do list item
function editTodoItem() {
    $(document).on('dblclick', '.view:has(.edit)', function (e) {
        $(this).find('.edit').removeAttr("disabled");
        $(this).find('.edit').css('text-decoration', 'unset');
        $(this).find('.edit').val($(this).find('.edit').val() + ' ');
        $(this).find('.edit').val($(this).find('.edit').val().trim());
        $(this).find('.edit').focus();
    })

    $(document).on('focusout', '.view:has(.edit)', function () {
        $(this).find('.edit').attr('disabled', false)
    })

    $(document).on('blur', '.view:has(.edit)', function () {
        $(this).find('.edit').attr('disabled', 'disabled');
        if ($(this).find('.edit').val().length == 0) {
            $(this).remove();
            isShowFooter();
            isShowClearCompleted()
        }
        if ($(this).find('.edit').hasClass("completed")) {
            $(this).find('.edit').css('text-decoration', 'line-through');
        }
    })

    $(document).on('keypress', '.view:has(.edit)', function (e) {
        if(e.which == 13) {
            $(this).find('.edit').attr('disabled', 'disabled');
            if ($(this).find('.edit').val().length == 0) {
                $(this).remove();
                isShowFooter();
                isShowClearCompleted()
            }
            if ($(this).find('.edit').hasClass("completed")) {
                $(this).find('.edit').css('text-decoration', 'line-through');
            }
        }
    })
}

// select states
function selectState() {
    //click to do list active button
    $(".to-do-active").click(function () {
        $('.filters').children().removeClass('active');
        $(this).addClass('active');
        $(".view:has(.completed)").hide();
        $(".view:has(.active)").show();
        if($(".view:has(.active)").length){
            $(".toggle-all").prop('checked', false);
        }else{
            $(".toggle-all").prop('checked', true);
        }
    })

    //click to do list completed button
    $(".to-do-completed").click(function () {
        $('.filters').children().removeClass('active');
        $(this).addClass('active');
        $(".view:has(.active)").hide();
        $(".view:has(.completed)").show();
        if($(".view:has(.completed)").length === $(".view").length){
            $(".toggle-all").prop('checked', true);
        }else{
            $(".toggle-all").prop('checked', false);
        }
    })

    //click to do list all button
    $(".all").click(function () {
        $('.filters').children().removeClass('active');
        $(this).addClass('active');
        $(".view").show();
        $(".toggle-all").prop('checked', false);
    })
}