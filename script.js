$(function() {
    
    $('#user_inputs').submit(function(){
        values = $(this).serializeArray()
        results = calc_dist(values);

        $('#dist_val').text(results[0])
        $('#units_val').text(results[1])
        $('#result_footer').removeClass('d-none')
    });


    $('#clear_form').click(function(){
        $('#user_inputs').trigger("reset")
        $('#result_footer').addClass('d-none')
    });


    function deg_to_rad(deg){
        /* Simply converts degrees to radians. Used in calc_dist() */

        pi = Math.PI
        return deg * (pi/180)
    } // end deg_to_rad


    function calc_dist(values){
        /* Calculates the distance between two points and outputs result in user-specified units */

        deg_vals = [values[0].value, values[1].value, values[2].value, values[3].value] 
        units = values[4].value

        rad_vals = deg_vals.map(x => deg_to_rad(x))

        dlon = rad_vals[3] - rad_vals[1]
        dlat = rad_vals[2] - rad_vals[0]

        a = Math.sin(dlat/2)**2 + Math.cos(rad_vals[0]) * Math.cos(rad_vals[2]) * Math.sin(dlon/2)**2
        c = 2 * Math.asin(Math.sqrt(a)) 

        if (units == 'Kilometers'){
            r = 6371.137
            units = 'kilometers'

        } else if (units == 'Nautical Miles'){
            r = 3440.1
            units = 'nautical miles'
        } else{
            r = 3959.87433
            units = 'square miles'
        }

        dist = (c * r).toFixed(6)

        return [dist, units]
    } // end calc_dist

});