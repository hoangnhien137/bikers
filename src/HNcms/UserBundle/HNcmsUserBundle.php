<?php

namespace HNcms\UserBundle;

use Symfony\Component\HttpKernel\Bundle\Bundle;

class HNcmsUserBundle extends Bundle
{
	public function getParent()
	{
		return 'FOSUserBundle';
	}
}
