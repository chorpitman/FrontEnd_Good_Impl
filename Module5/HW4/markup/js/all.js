var $skills_form,
    $menu_item,
    $education_list;

var firebaseDbData = new Firebase('https://hw3-cdp.firebaseio.com/').child("education"),
    start = 0,
    end = 4,
    limit = 5;

$(document).ready(function() {

    $menu_item = $(".sidebar ul li a");
    $education_list = $('#education .timeline ul');

    /* Hide menu functionality */

    $(".hide-menu-button").click(function() {
        $(".sidebar, .hide-menu-button, .go-top-button, .content").toggleClass("hidden-menu");
    });

    /* Go to top functionality */

    $(".go-top-button").click(goTop);

    /* Anchor navigation functionality */

    $menu_item.click(onClickMenu);
    $(document).on("scroll", onScroll);

    /* Portfolio with sortable plugin functionality */

    isotopeFilter("*");
    $(".portfolioFilter a").click(filterPortfolio);

    /* History box from Firebase database */

    $education_list.scroll(onEducationScroll);

});

function goTop() {
    $("html,body").animate({
        scrollTop: 0
    });
}

function onClickMenu(event) {
    event.preventDefault();
    var currentPosition = $($(this).attr("href")).position();
    $("html,body").scrollTop(currentPosition.top);
}

function onScroll() {
    var scrollPosition = $(document).scrollTop();
    $menu_item.each(function() {
        var currentLink = $(this);
        var refElement = $(currentLink.attr("href"));
        var currentPosition = refElement.position();
        if (currentPosition.top - 40 <= scrollPosition && currentPosition.top + refElement.height() > scrollPosition) {
            $menu_item.removeClass("active");
            currentLink.addClass("active");
        } else {
            currentLink.removeClass("active");
        }
    });
}

function filterPortfolio() {
    $(".portfolioFilter .active").removeClass("active");
    $(this).addClass("active");

    isotopeFilter($(this).attr("data-filter"));
    return false;
}

function isotopeFilter(filter) {
    $(".portfolioContainer").isotope({
        filter: filter,
        animationOptions: {
            duration: 1000,
            easing: "linear",
            queue: false
        }
    });
}

function onEducationScroll() {
    if ($education_list.height() >= ($education_list[0].scrollHeight - $education_list.scrollTop())) {
        firebaseDbData.orderByKey()
            .startAt(start.toString())
            .endAt(end.toString())
            .on("child_added", function(snapshot) {
                addNewEducation(snapshot);
            });

        start += limit;
        end += limit;
    }
}

function addNewEducation(snapshot) {
    var element = wrap("li", newInfoElement(snapshot.val()));
    $education_list.append(element);
}

function newInfoElement(educationValue) {
    var newInfoElement = "";

    newInfoElement += wrap("span", educationValue.date, "year");
    newInfoElement += wrap("div", wrap("h4", educationValue.title) + educationValue.someText, "info");

    return newInfoElement;
}

function wrap(elementName, text, className) {
    var classAttribute = (className) ? " class='" + className + "'" : "";
    return "<" + elementName + classAttribute + ">" + text +  "</" + elementName + ">";
}
