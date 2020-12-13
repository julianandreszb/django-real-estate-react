class Utils:

    @staticmethod
    def get_json_paginator_information(page):

        json_paginator = {
            'has_previous': page.has_previous(),
            'has_next': page.has_next(),
            'number': page.number,
            'num_pages': page.paginator.num_pages,
        }

        if page.has_previous():
            json_paginator['previous_page_number'] = page.previous_page_number()

        if page.has_next():
            json_paginator['next_page_number'] = page.next_page_number()

        return json_paginator
