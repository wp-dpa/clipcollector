<?php

ini_set('date.timezone', 'Europe/Berlin');

require_once './vendor/autoload.php';
require_once './header.php';

function sortByLastInteraction($a, $b)
{
    if ($a->timestamp == $b->timestamp) {
        return 0;
    }
    return ($a->timestamp > $b->timestamp) ? -1 : 1;
}

function getInstagramEmbedByPostUri($uri) {

    $request = \EasyRequest\Client::request('https://api.instagram.com/oembed/?url=' . $uri . '&size=s');
    $response = $request->send();

    if (! $reqBody = $request->getResponse()->getBody()) {
        return 'Kann nicht aus Datenbank lesen …';

    }
    if ($body = (string) $request->getResponse()->getBody()) {
        $data = json_decode($body);
        if (false !== $data) {
            return $data;
        }
    }

    return 'Fehler';
}

$request = \EasyRequest\Client::request('http://localhost:3000/interactions');
$response = $request->send();

// Returns \Psr\Http\Message\ResponseInterface
// Or null if request is not sent or failure

if (! $reqBody = $request->getResponse()->getBody()) {
    $errorMsg = 'Kann nicht aus Datenbank lesen …';

}
if ($body = (string) $request->getResponse()->getBody()) {
    $list = json_decode($body);
}


if (isset($errorMsg) && $errorMsg) {
    ?><div class="alert alert-danger" role="alert"><?= htmlentities($errorMsg); ?></div><?php
}

if (isset($list)) {
    ?>

    <h1 style="margin-bottom: 60px;">Clip Collector</h1>

    <h2>Sa, 17. Februar 2018</h2>

    <?php
    usort($list, "sortByLastInteraction");


    foreach ($list as $row) {

        ?>
        <div class="media" style="position: relative; border: 1px solid #eeeeee; padding: 10px 10px 10px 80px; margin-bottom: 60px; width: 75%">

            <i class="fab fa-instagram" style="position: absolute; top: 10px; left: 17px; font-size: 50px;"></i>


            <?php
            if (property_exists($row, 'interactionType') && $row->interactionType == 'flag') {
                echo '<i class="fas fa-bell" style="position: absolute; top: 20px; right: 20px; font-size: 30px; color: red;" title="Interaktion nötig"></i>';
            }

            $postData = getInstagramEmbedByPostUri($row->url);
            ?>
            <a href="<?= $row->url; ?>" target="_blank">
                <img class="mr-3" src="<?= $postData->thumbnail_url ?>" width="300" alt=""/>
            </a>
            <div class="media-body">

                <div style="margin-bottom: 30px; width:360px;">
                    <span style="font-weight: bold;"><?php echo htmlentities($postData->author_name); ?></span><br />
                    <?php echo htmlentities($postData->title); ?>

                </div>
                <?php



                if (property_exists($row, 'interactionType')) {
                    switch ($row->interactionType) {
                        case 'like':
                            ?>
                            <div><i class="fas fa-check"></i> Like</div><?php
                            break;
                        case 'comment':
                            ?>
                            <div><i class="fas fa-check"></i> Kommentar</div><?php
                            break;
                    }
                }
                ?>

                <div style="margin-top: 10px;">
                <?php
                    for ($i=1; $i<=5; $i++) {

                        if (property_exists($row, 'rating') && $row->rating >= $i) {
                            $bgcolor = 'gold';
                        }
                        else {
                            $bgcolor = '#DDDDDD';
                        }

                        echo '<i class="fas fa-star" style="color: ' . $bgcolor . '; margin-right: 6px;"></i>';
                    }
                ?>
                </div>

                <div style="margin-top: 10px;">
                    <textarea style="width: 300px; padding: 5px; border: 1px solid #dddddd;" rows="5" placeholder="Notiz"></textarea>
                </div>

                <div  style="margin-top: 10px;"><input type="text" placeholder="Tags" style="width: 300px; padding: 5px; border: 1px solid #dddddd;"/></div>

                <div  style="margin-top: 30px;"><a href="" class="lnk-trash" style="font-size: 12px; color: #CCCCCC;"><i class="fas fa-trash"></i> Clipping entfernen</a></div>
            </div>
        </div>
    <?php }

}?>



<div class="media" style="position: relative; border: 1px solid #eeeeee; padding: 10px 10px 10px 80px; margin-bottom: 60px; width: 75%">

    <i class="fab fa-facebook" style="position: absolute; top: 10px; left: 17px; font-size: 50px;"></i>

    <a href="" target="_blank">
        <img class="mr-3" src="img/hackathonrebootpr.jpg" width="300" alt=""/>
    </a>
    <div class="media-body">

        <div style="margin-bottom: 30px;">
            <span style="font-weight: bold;">newsaktuell</span><br />
            Der Cola- und Matekonsum steigt, die Konzentration auch: Seit knapp 30 Stunden tüfteln, konzeptionieren und coden die Teams unseres PR-Hackathons in Hamburg. Bis morgen Mittag
            <a href="">mehr …</a>

        </div>


        <div style="margin-top: 10px;">
            <i class="fas fa-star" style="color: gold; margin-right: 6px;"></i>
            <i class="fas fa-star" style="color: gold; margin-right: 6px;"></i>
            <i class="fas fa-star" style="color: gold; margin-right: 6px;"></i>
            <i class="fas fa-star" style="color: #dddddd; margin-right: 6px;"></i>
            <i class="fas fa-star" style="color: #dddddd; margin-right: 6px;"></i>

        </div>

        <div style="margin-top: 10px;">
            <textarea style="width: 300px; padding: 5px; border: 1px solid #dddddd;" rows="5" placeholder="Notiz"></textarea>
        </div>

        <div  style="margin-top: 10px;"><input type="text" placeholder="Tags" style="width: 300px; padding: 5px; border: 1px solid #dddddd;"/></div>

        <div  style="margin-top: 30px;"><a href="" class="lnk-trash" style="font-size: 12px; color: #CCCCCC;"><i class="fas fa-trash"></i> Clipping entfernen</a></div>
    </div>
</div>

    <h2>Do, 15. Februar 2018</h2>

    <div class="media" style="position: relative; border: 1px solid #eeeeee; padding: 10px 10px 10px 80px; margin-bottom: 60px; width: 75%">

        <i class="fab fa-twitter" style="position: absolute; top: 10px; left: 17px; font-size: 50px;"></i>
        <i class="fas fa-bell" style="position: absolute; top: 20px; right: 20px; font-size: 30px; color: red;" title="Interaktion nötig"></i>

        <a href="" target="_blank">
            <img class="mr-3" src="img/otto.jpg" width="300" alt=""/>
        </a>
        <div class="media-body">

            <div style="margin-bottom: 30px; width: 360px;">
                <span style="font-weight: bold;">Otto (GmbH &amp; Co. KG)</span><br />
                Liebe #PRHack-Crew, willkommen auf dem OTTO-Campus! Wir wünschen euch viel Spaß & drücken die Daumen für smarte Ideen! #hackathon @newsaktuell

            </div>


            <div style="margin-top: 10px;">
                <i class="fas fa-star" style="color: gold; margin-right: 6px;"></i>
                <i class="fas fa-star" style="color: gold; margin-right: 6px;"></i>
                <i class="fas fa-star" style="color: gold; margin-right: 6px;"></i>
                <i class="fas fa-star" style="color: gold; margin-right: 6px;"></i>
                <i class="fas fa-star" style="color: #dddddd; margin-right: 6px;"></i>

            </div>

            <div style="margin-top: 10px;">
                <textarea style="width: 300px; padding: 5px; border: 1px solid #dddddd;" rows="5" placeholder="Notiz">Nächste Woche noch einmal bei Nick bedanken!</textarea>
            </div>

            <div  style="margin-top: 10px;"><input type="text" placeholder="Tags" style="width: 300px; padding: 5px; border: 1px solid #dddddd;"/></div>

            <div  style="margin-top: 30px;"><a href="" class="lnk-trash" style="font-size: 12px; color: #CCCCCC;"><i class="fas fa-trash"></i> Clipping entfernen</a></div>
        </div>
    </div>

<?php require_once './footer.php';








