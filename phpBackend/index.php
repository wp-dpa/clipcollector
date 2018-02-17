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
<table class="table">

    <tbody>


    <?php
    usort($list, "sortByLastInteraction");

    foreach ($list as $row) {

        ?>
        <tr>
            <td>
                <h2>Instagram</h2>
                <?php
                $postData = getInstagramEmbedByPostUri($row->url);
                ?>
                <a href="<?=$row->url; ?>" target="_blank">
                    <img src="<?= $postData->thumbnail_url ?>" width="<?= $postData->thumbnail_width ?>" height="<?= $postData->thumbnail_height ?>" alt=""/>
                </a>
                <?php

                ?></td>
        </tr>
        <?php
    }


    ?>
        </tbody>
    </table>
    <?php
}

